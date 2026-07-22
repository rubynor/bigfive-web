// Compare builder (Phase 4 step 7, fork commits e1c2ea6 + 4a0e042): build a
// list of {name, id} results, re-seeded from ?people= (and ?id= from the
// result page's "compare yourself to others" link). The list is mirrored back
// into ?people= via history.replaceState so it survives reloads and locale
// switches (the locale switcher re-appends the query string). Reorder by
// dragging the grip handle (native DnD) or with arrow keys on the focused
// grip (moveItem = remove-and-reinsert, not swap).

import { useNavigate } from '@solidjs/router';
import { createEffect, createMemo, createSignal, For, Show } from 'solid-js';
import {
  decodeComparePeople,
  encodeComparePeople,
  moveItem,
  type ComparePerson
} from '@bigfive-org/data/compare-people';
import { formatId, validId } from '@bigfive-org/data/result-id';
import clsx from 'clsx';
import { DeleteIcon, EditIcon, PersonIcon, ResultIcon } from '~/components/icons';
import { Button } from '~/components/ui';
import { Modal } from '~/components/ui/overlays';
import { useI18n } from '~/lib/i18n';
import { localePath } from '~/lib/i18n/nav';

function GripIcon(props: { size?: number }) {
  return (
    <svg
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden='true'
    >
      <circle cx='9' cy='6' r='1.6' />
      <circle cx='15' cy='6' r='1.6' />
      <circle cx='9' cy='12' r='1.6' />
      <circle cx='15' cy='12' r='1.6' />
      <circle cx='9' cy='18' r='1.6' />
      <circle cx='15' cy='18' r='1.6' />
    </svg>
  );
}

const inputClass =
  'w-full rounded-lg border border-divider bg-content1 py-2 pl-10 pr-3 text-sm outline-none focus:border-primary';

export function ComparePeople(props: {
  initialRows: ComparePerson[];
  initialId?: string;
}) {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const [rows, setRows] = createSignal<ComparePerson[]>(props.initialRows);
  const [name, setName] = createSignal('');
  const [id, setId] = createSignal(props.initialId ?? '');
  const [dragIndex, setDragIndex] = createSignal<number | null>(null);

  // Edit modal state
  const [editIndex, setEditIndex] = createSignal<number | null>(null);
  const [editName, setEditName] = createSignal('');
  const [editId, setEditId] = createSignal('');

  // Mirror the rows into ?people= (native replaceState — no navigation), so
  // the builder state survives reloads and locale switches.
  createEffect(() => {
    const list = rows();
    const url = new URL(window.location.href);
    if (list.length > 0) {
      url.searchParams.set('people', encodeComparePeople(list));
    } else {
      url.searchParams.delete('people');
    }
    window.history.replaceState(null, '', url);
  });

  const formattedId = createMemo(() => formatId(id()));
  const isInvalidId = createMemo(() => {
    if (id() === '') return false;
    if (!validId(formattedId())) return true;
    return rows().some((row) => row.id === formattedId());
  });
  const canAdd = createMemo(
    () => name() !== '' && id() !== '' && !isInvalidId()
  );

  const addPerson = () => {
    if (!canAdd()) return;
    setRows([...rows(), { name: name(), id: formattedId() }]);
    setName('');
    setId('');
  };

  const openEdit = (index: number) => {
    const row = rows()[index];
    setEditIndex(index);
    setEditName(row.name);
    setEditId(row.id);
  };
  // Duplicate guard mirrors the add path (isInvalidId), excluding the row
  // being edited — a seeded ?people= link can legitimately carry duplicates.
  const isInvalidEditId = createMemo(() => {
    if (editId() === '') return false;
    const formatted = formatId(editId());
    if (!validId(formatted)) return true;
    const current = editIndex();
    return rows().some((row, i) => i !== current && row.id === formatted);
  });
  const saveEdit = () => {
    const index = editIndex();
    if (index === null || editName() === '' || isInvalidEditId()) return;
    setRows(
      rows().map((row, i) =>
        i === index ? { name: editName(), id: formatId(editId()) } : row
      )
    );
    setEditIndex(null);
  };

  const compare = () =>
    navigate(
      localePath(locale(), `/compare/${encodeComparePeople(rows())}`)
    );

  return (
    <div class='mt-6'>
      <div class='flex flex-col gap-4 md:flex-row'>
        <label class='flex flex-1 flex-col gap-1 text-sm font-medium'>
          {t('getCompare.name')}
          <div class='relative'>
            <span class='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-default-400'>
              <PersonIcon size={20} />
            </span>
            <input
              type='text'
              class={inputClass}
              placeholder='Arthur Dent'
              value={name()}
              onInput={(e) => setName(e.currentTarget.value)}
            />
          </div>
        </label>
        <label class='flex flex-1 flex-col gap-1 text-sm font-medium'>
          ID
          <div class='relative'>
            <span class='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-default-400'>
              <ResultIcon size={20} />
            </span>
            <input
              type='text'
              class={clsx(inputClass, 'font-mono')}
              placeholder='58a70606a835c400c8b38e84'
              value={id()}
              onInput={(e) => setId(e.currentTarget.value)}
              aria-invalid={isInvalidId()}
              onKeyDown={(e) => e.key === 'Enter' && addPerson()}
            />
          </div>
          <Show when={isInvalidId()}>
            <span class='text-xs text-danger'>{t('compare.invalidId')}</span>
          </Show>
        </label>
      </div>
      <Button
        color='primary'
        class='mt-4'
        disabled={!canAdd()}
        onClick={addPerson}
      >
        {t('getCompare.addPerson')}
      </Button>

      <div class='mt-6 rounded-xl border border-divider bg-content1 shadow-sm'>
        <Show
          when={rows().length > 0}
          fallback={
            <p class='p-8 text-center text-sm text-default-400'>
              {t('compare.noRows')}
            </p>
          }
        >
          <ul aria-label={t('compare.listLabel')} class='select-none'>
            <For each={rows()}>
              {(row, index) => (
                <li
                  class={clsx(
                    'grid grid-cols-[auto_1fr_auto] items-center gap-2 px-3 py-2 md:grid-cols-[auto_1fr_1.5fr_auto]',
                    index() % 2 === 0 ? 'bg-content1' : 'bg-default-100',
                    dragIndex() === index() && 'opacity-50'
                  )}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    const from = dragIndex();
                    setDragIndex(null);
                    if (from !== null) {
                      setRows(moveItem(rows(), from, index()));
                    }
                  }}
                >
                  <button
                    type='button'
                    draggable
                    onDragStart={(e) => {
                      setDragIndex(index());
                      if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
                    }}
                    onDragEnd={() => setDragIndex(null)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        setRows(moveItem(rows(), index(), index() - 1));
                      } else if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        setRows(moveItem(rows(), index(), index() + 1));
                      }
                    }}
                    aria-label={t('compare.reorder', { name: row.name })}
                    aria-keyshortcuts='ArrowUp ArrowDown'
                    title={t('compare.reorderHint')}
                    class='cursor-grab text-default-400 transition-opacity hover:opacity-70 active:cursor-grabbing'
                  >
                    <GripIcon size={20} />
                  </button>
                  <span class='truncate text-sm font-medium'>{row.name}</span>
                  <span class='hidden truncate font-mono text-sm text-default-500 md:block'>
                    {row.id}
                  </span>
                  <span class='flex gap-1'>
                    <button
                      type='button'
                      aria-label='Edit'
                      class='cursor-pointer rounded-full p-1 text-default-500 transition-colors hover:bg-content2'
                      onClick={() => openEdit(index())}
                    >
                      <EditIcon size={18} />
                    </button>
                    <button
                      type='button'
                      aria-label='Delete'
                      class='cursor-pointer rounded-full p-1 text-default-500 transition-colors hover:bg-content2 hover:text-danger'
                      onClick={() =>
                        // By index, not id: duplicate ids (a seeded
                        // ?people= link may carry them) must not both vanish.
                        setRows(rows().filter((_, i) => i !== index()))
                      }
                    >
                      <DeleteIcon size={18} />
                    </button>
                  </span>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </div>

      <Button
        color='primary'
        size='lg'
        class='mt-6'
        disabled={rows().length < 2}
        onClick={compare}
      >
        {t('getCompare.comparePeople')}
      </Button>

      <Modal
        open={editIndex() !== null}
        onOpenChange={(open) => !open && setEditIndex(null)}
        title={t('compare.editPerson')}
      >
        <div class='flex flex-col gap-4'>
          <label class='flex flex-col gap-1 text-sm font-medium'>
            {t('getCompare.name')}
            <input
              type='text'
              class={inputClass.replace('pl-10', 'pl-3')}
              placeholder='Arthur Dent'
              value={editName()}
              onInput={(e) => setEditName(e.currentTarget.value)}
            />
          </label>
          <label class='flex flex-col gap-1 text-sm font-medium'>
            ID
            <input
              type='text'
              class={clsx(inputClass.replace('pl-10', 'pl-3'), 'font-mono')}
              placeholder='58a70606a835c400c8b38e84'
              value={editId()}
              onInput={(e) => setEditId(e.currentTarget.value)}
              aria-invalid={isInvalidEditId()}
            />
            <Show when={isInvalidEditId()}>
              <span class='text-xs text-danger'>
                {t('compare.invalidIdPlain')}
              </span>
            </Show>
          </label>
          <div class='flex justify-end gap-2'>
            <Button
              color='danger'
              variant='ghost'
              onClick={() => setEditIndex(null)}
            >
              {t('common.close')}
            </Button>
            <Button
              color='primary'
              disabled={editName() === '' || isInvalidEditId()}
              onClick={saveEdit}
            >
              {t('common.save')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
