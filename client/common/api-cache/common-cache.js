import {createApiCache} from "./api-cache";
import {schoolApi} from "../../api/common/school-api";


export const schoolsBriefCache = createApiCache(() => schoolApi.getSchoolsBrief());