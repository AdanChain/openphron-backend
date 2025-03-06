interface OracleTransaction {
    args: {
        oracleId: string;
        name: string;
        description: string;
        subscriptionPrice: BigInt;
        owner: string;
    };
}

interface QuestionTransaction {
    args: {
        questionId: string;
        oracleId: string;
        question: string;
        answer: string;
        updatedAt: number;
    };
}

interface SubscriptionTransaction {
    args: {
        user: string;
        userContract: string;
        oracleId: number;
        expire: Date;
    };
}

interface Oracle {
    id: string;
    name: string;
    description: string;
    subscriptionPrice: string;
    owner: string;
}

interface HandleEventProps {
    id: string;
    provider: any;
    contract: any;
    event: string;
    times: number;
    handler: (tx: any, id: string) => Promise<void>;
    BlockNumController: any; // Adjust according to your BlockNumController type
}