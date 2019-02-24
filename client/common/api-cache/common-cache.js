import {createApiCache} from "./api-cache";
import {schoolApi} from "../../api/common/school-api";
import {orgLocationApi} from "../../api/common/org-location-api";
import {subjectApi} from "../../api/common/subject-api";
import {candidateApi} from "../../api/common/candidate-api";
import {supervisorApi} from "../../api/common/supervisor-api";


export const schoolsBriefCache = createApiCache(() => schoolApi.getSchoolsBrief());
export const orgLocationsBriefCache = createApiCache(() => orgLocationApi.getOrgLocationsBrief());
export const subjectsBriefCache = createApiCache(() => subjectApi.getSubjectsBrief());
export const candidateBriefCache = createApiCache(() => candidateApi.getCandidatesBrief());
export const supervisorBriefCache = createApiCache(() => supervisorApi.getSupervisorsBrief());