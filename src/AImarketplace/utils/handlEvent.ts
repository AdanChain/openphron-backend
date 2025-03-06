const handleEvent = async (props: HandleEventProps): Promise<void> => {
    const { id, provider, contract, event, times, handler, BlockNumController } = props;

    let latestBlockNumber: number | undefined;

    const handleTransactions = async (): Promise<void> => {
        if (latestBlockNumber === undefined) {
            return;
        }

        try {
            let latestBlock = latestBlockNumber;
            let blockNumber = await provider.getBlockNumber();

            if (blockNumber > latestBlock) {
                blockNumber = (blockNumber > latestBlock + 1000) ? (latestBlock + 1000) : blockNumber;

                const res = await contract.queryFilter(event, latestBlock + 1, blockNumber);
                for (const tx of res) {
                    console.log('tx', tx)
                    await handler(tx, id);
                }

                latestBlockNumber = blockNumber;
                await BlockNumController.update(
                    { id: id },
                    { latestBlock: blockNumber }
                );
            }
        } catch (err: any) {
            if (err.reason === "missing response") {
                console.log("You seem offline");
            } else {
                console.log(`handleEvent error ${id}`, event, err.reason);
            }
        }
    };

    const initializeEventHandling = async (): Promise<void> => {
        let blockNumber: number;

        try {
            const blockNumData = await BlockNumController.findOne({ id: id });

            if (!blockNumData || !blockNumData.latestBlock) {
                throw new Error("Block number not found in DB: " + id);
            }

            blockNumber = blockNumData.latestBlock;
        } catch (err) {
            blockNumber = await provider.getBlockNumber();
            await BlockNumController.create({ id: id, latestBlock: blockNumber });
        }

        latestBlockNumber = blockNumber;

        setInterval(() => {
            handleTransactions();
        }, times);
    };

    await initializeEventHandling();
};

export default handleEvent;
