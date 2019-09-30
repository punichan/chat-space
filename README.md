# README
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|mailaddress|string|null: false|
|password|string|null: false|

### Association
- has_many :tweets
- has_many :users_groups
- has_many :groups, through: :users_groups

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group|string|null: false|

### Association
- has_many :tweets
- has_many :users, through: :users_groups

## users_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## tweetsテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

- belongs_to :group
- belongs_to :user 