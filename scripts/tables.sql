create table languages(
	language_id smallserial primary key,
	language_name varchar(50) not null check(language_name <>'') unique,
	supported_since date not null default CURRENT_DATE
);

create table users(
	user_id bigserial primary key,
	email varchar(255) not null CHECK(email like '%@%') UNIQUE,
	password_hash varchar(128) not null CHECK(password_hash <> ''),
	preferred_language smallint not null references languages(language_id),
	created_at date not null default CURRENT_DATE
);

create table chats(
	chat_id bigserial primary key,
	owner_id bigint references users(user_id),
	title varchar(50) not null CHECK(title <> ''),
	created_at date not null default CURRENT_DATE
);

create table messages (
	message_id bigserial primary key,
	chat_id bigint references chats(chat_id),
	content text not null check(content <> ''),
	sent_by_user bool not null,
	created_at date default CURRENT_DATE
);

insert into languages(language_name)
values('Spanish'),('English');

insert into users(email, password_hash, preferred_language)
values('luisdanieldlcg@gmail.com', '$x9281kdla', 2);

insert into chats(owner_id, title)
values(1, 'New chat room for translating my homework');

insert into messages(chat_id, content, sent_by_user)
values(1, 'Where are you?', true);

insert into messages(chat_id, content, sent_by_user)
values(1, 'Dónde estás?', false);

-- select * from languages;
-- select * from users;
-- select * from chats;
-- select * from messages;

-- Get user data
--select u.user_id, u.email, u.password_hash, u.created_at, l.language_name as preferred_language
--from users u
--join languages l on u.preferred_language = l.language_id

-- Get user chats
--select * from chats c
--where c.owner_id = 1;

-- Get chat messages
--select * from messages
--where chat_id = 1;


