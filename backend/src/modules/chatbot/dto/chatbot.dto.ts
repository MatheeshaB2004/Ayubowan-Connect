export class ChatbotRequestDto {
    queryResult?: {
        queryText?: string;
    };
    message?: string;
}

export class ChatbotResponseDto {
    fulfillmentText: string;
    payload?: {
        navigation?: string;
        data?: any;
    };
}
