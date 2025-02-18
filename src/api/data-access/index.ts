import { UserApiKeysModel } from "../model";
import ApiKeyDA from "./apiKey";

const apiKeyDA = new ApiKeyDA(UserApiKeysModel);

export {
    apiKeyDA
}