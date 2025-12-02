import { CheckPermissionDto, CheckPermissionResponseDto } from '../models/dtos';

export interface IDecisionService {
    checkPermission(dto: CheckPermissionDto): CheckPermissionResponseDto;
}
