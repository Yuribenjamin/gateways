export interface IGateway {
	_id: string;
	serial: string;
	name: string;
	ip: string;
	devices: IDevice[];
}

export interface IDevice {
	_id: string;
	uuid: string;
	vendor: string;
	status: string;
	dateCreated: string;
}
