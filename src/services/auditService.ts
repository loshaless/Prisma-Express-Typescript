import { AuditLog } from "../models/auditLogModel";
import { TableName, Operation } from "../constant/tableName";

interface AuditLogData {
  tableName: TableName;
  operation: Operation;
  oldValues?: object;
  newValues?: object;
  userId?: number;
}

class AuditService {
  /**
   * Create an audit log entry
   * @param data AuditLogData
   */
  async log(data: AuditLogData): Promise<void> {
    await AuditLog.create({
      data: {
        tableName: data.tableName,
        operation: data.operation,
        oldValues: data.oldValues ? JSON.stringify(data.oldValues) : null,
        newValues: data.newValues ? JSON.stringify(data.newValues) : null,
        userId: data.userId,
      },
    });
  }
}

const auditService = new AuditService();
export default auditService;