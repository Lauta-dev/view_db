import { HttpStatus } from "@nestjs/common";

export class ReturnResponse {
	readonly statusCode: number | HttpStatus;
	readonly message: string;
	readonly returnData: any;

	constructor(
		statusCode: number | HttpStatus,
		message?: string,
		returnData?: any,
	) {
		if (returnData) {
			this.returnData = returnData;
		}

		if (message) {
			this.message = message;
		}

		this.statusCode = statusCode;
	}

	public getResponse() {
		const statusCode = this.statusCode;
		const message = this.message;
		const returnData = this.returnData;

		return {
			server: {
				statusCode,
				message,
				returnData,
			},
		};
	}
}
