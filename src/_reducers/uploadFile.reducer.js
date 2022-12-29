import { masterConstants } from "../_constants";

export function uploadFile(state = {}, action) {
    switch (action.type) {
        case masterConstants.UPLOAD_FILE_REQUEST:
            return {
                loading: true,
            };
        case masterConstants.UPLOAD_FILE_SUCCESS:
            return {
                loading: false,
                uploadFile: action.uploadFile,
            };
        case masterConstants.UPLOAD_FILE_FAILURE:
            return {
                error: action.error,
            };
        case masterConstants.UPLOAD_FILE_RESET:
            return {
            };
        default:
            return state;
    }
}
