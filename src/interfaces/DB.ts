export interface Settings {
	Guild: String;
	Moderators: Array<String>;
	LogChannelId: String;
}

export interface Channels {
	Guild: String;
	Channel: String;
	Number: Number;
	Quote: Boolean;
	Pings: Array<String>;
	Text: String;
}

export interface Tickets {
	Guild: String;
	Channel: String;
	Number: Number;
	Message: String;
	Creator: String;
	CreatedAt: Number;
	ClosedAt: Number;
}
