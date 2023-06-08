import { Schema, model } from 'mongoose';

export const TaskStatus = ['INITIATED', 'SENT_TO_CLOUD', 'RECEIVED_RESIZED', 'COMPLETED'];
export type TaskStatusType = 'INITIATED' | 'SENT_TO_CLOUD' | 'RECEIVED_RESIZED' | 'COMPLETED';
export enum TaskStatusEnum {
    INITIATED = 'INITIATED',
    SENT_TO_CLOUD = 'SENT_TO_CLOUD',
    RECEIVED_RESIZED = 'RECEIVED_RESIZED',
    COMPLETED = 'COMPLETED'
};

export const TaskTypes = ['IMAGE_SCALER'];
export type TaskTypesType = 'IMAGE_SCALER';

/**
 * Task mongo db schema
 */
const TaskSchema = new Schema({
    status: {
        type: String,
        enum: TaskStatus,
        default: TaskStatus[0],
    },
    type: {
        type: String,
        enum: TaskTypes,
        default: TaskTypes[0],
    },
    path: String,
    images: {
        original: String,
        '800': String,
        '1024': String
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updates: Array,
});

/**
 * Task mongo db model
 */
export const TaskModel = model('Task', TaskSchema);