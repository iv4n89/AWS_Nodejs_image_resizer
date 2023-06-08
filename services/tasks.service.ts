import imageSize from 'image-size';
import { TaskModel, TaskStatusEnum } from "../models/tasks.model";
import { imagesService } from "./images.service";


const createTask = async (file: Express.Multer.File) => {

    const [fileName, extension] = file.originalname.split('.');
    const bitmap = file.buffer.toString('base64');
    const size = imageSize(file.buffer).width;
    if (!size) {
        throw new Error('An error has occurred trying to get image size');
    }
    let image = await imagesService.createImage(bitmap, size, file.mimetype);

    let task = new TaskModel({
        images: {
            original: image.id
        },
        path: 'memory',
        updates: [
            {
                updatedAt: new Date(),
                newStatus: TaskStatusEnum.INITIATED
            }
        ]
    });

    task = await task.save();

    return {
        task,
        filename: fileName,
        extension,
        bitmap,
    }
}

const updateStatus = (task: any, status: TaskStatusEnum) => {
    task.updates = [...task.updates, { updatedAt: new Date(), previousStatus: task.status, newStatus: status }];
    task.status = status;
    return task.save();
}

const updateImages = (task: any, images: { original?: string, '800'?: string, '1024'?: string }) => {
    task.images = {
        ...task.images,
        ...(!!images?.[800] && { '800': images[800] }),
        ...(!!images?.[1024] && { '1024': images[1024] }) 
    }
    return task.save();
}

export const taskService = {
    createTask,
    updateStatus,
    updateImages,
}