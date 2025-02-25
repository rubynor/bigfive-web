#!/bin/bash

# 現在のタイムスタンプを yyyy-mm-dd-hh-mm 形式で取得
timestamp="auto-commit-$(date +"%Y-%m-%d-%H-%M")"

# 現在の作業ブランチ名を保存
current_branch=$(git symbolic-ref --short HEAD)

# 現在のスクリプトのディレクトリを取得
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# 現在の変更を保存
git add .
git commit -m "update"

# タイムスタンプ名で新しいブランチを作成して切り替え
git checkout -b $timestamp
git push --set-upstream origin $timestamp

# 元のブランチに戻る
git checkout $current_branch

# ステータスメッセージを表示
echo "✅ 変更が完了しました:"
echo "  - 現在のブランチ ($current_branch) にコミット"
echo "  - 新しいブランチ ($timestamp) を作成"

# ブランチのクリーンアップを実行
echo -e "\nブランチのクリーンアップを開始..."
$SCRIPT_DIR/cleanup-branches.sh

# 新しく作成したブランチに切り替え
git checkout $timestamp
echo -e "\n新しいブランチに切り替えました: $timestamp"