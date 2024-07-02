create table contect (
	ContectId int identity(1,1) primary key,
	PhoneNumber varchar(10) not null,
	FirstName varchar(20) not null, 
	LastName varchar(20) not null, 
	Email varchar(50) not null,
	ProfileImage varchar(100) not null,
	Age int not null
)

create table message (
	MessageId int identity(1,1) primary key,
	FromNumber varchar(10) not null, 
	ToNumber varchar(10) not null,
	MessageTxt varchar(max) not null,
	ContectId int foreign key references contect(ContectId),
	GroupId int foreign key references message_group(GroupId),
	SentDateTime datetime
)

create table message_group (
	GroupId int identity(1,1) primary key,
	GroupName varchar(50)
)

create table group_member (
	GroupMemberId int identity(1,1) primary key,
	ContectId int foreign key references contect(ContectId) not null,
	GroupId int foreign key references message_group(groupId) not null,
	JoinedDateTime dateTime,
	LeftDateTime dateTime
)