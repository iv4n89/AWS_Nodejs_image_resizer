import { Request, Response } from "express";
import { TaskModel, TaskStatusEnum } from "../models/tasks.model";
import { awsService } from "../services/aws.service";
import { imagesService } from "../services/images.service";
import { taskService } from "../services/tasks.service";
import { ResponseBuilder } from "../util/responseBuilder";



/**
 * Create a new task and persist it in database
 * @param { Request } req
 * @param { Response } res 
 * @returns { Promise<void> } 
 */
const createTask = async ({ file }: Request, res: Response): Promise<void> => {
    if (!file) {
        new ResponseBuilder(res)
            .BadRequest()
            .Json({
                message: 'File has not been sent or a problem has been encountered'
            })
            .build();

        return;
    }

    const { extension, filename, task, bitmap } = await taskService.createTask(file);

    new ResponseBuilder(res)
        .Created()
        .Json({ task: task.id })
        .build();

    const { data: { body: { resizedImage1024, resizedImage800 } } } = await awsService.resizeImage(bitmap);

    await taskService.updateStatus(task, TaskStatusEnum.RECEIVED_RESIZED);

    const image800 = await imagesService.createImage(resizedImage800, '800', file.mimetype, { filename, extension })
    const image1024 = await imagesService.createImage(resizedImage1024, '1024', file.mimetype, { filename, extension });

    await taskService.updateImages(task, { '800': image800.id, '1024': image1024.id });
    await taskService.updateStatus(task, TaskStatusEnum.COMPLETED);
}

/**
 * Get a task from database by task id
 * @param { Request } req
 * @param { Respnse } res
 * @returns { Promise<Response> } response
 */
const getTask = async ({ params: { taskId } }: Request<{ taskId: string }>, res: Response): Promise<Response> => {
    const task = await TaskModel.findById(taskId);
    const status = task?.status;

    if (!task) {
        return new ResponseBuilder(res)
            .BadRequest()
            .Json({
                message: 'Task id seems not to be valid'
            })
            .build();
    }

    return new ResponseBuilder(res)
        .Ok()
        .Json({ status })
        .build();
}

export const taskController = {
    createTask,
    getTask
}