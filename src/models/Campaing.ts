export type SummaryItem = {
  id: string;
  value: number;
};

export type CampaignData = {
  campaignId: string;
  totalMessages: number;
  totalSent: number;
  totalDelivered: number;
  totalErrors: number;
  totalCost: string;
  currency: string;
  messages: {
    phone: string;
    status: string;
    dateSent: string | null;
    price: string | number | null;
    errorMessage: string | null;
    messageSid: string;
    body: string;
    priceUnit: string;
    errorCode: number | null;
  }[];
};
