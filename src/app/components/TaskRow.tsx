import { DeleteTaskInput, Task, UpdateTaskInput } from "@/src/shared/schemas/task.schema";
import { SquarePen, Trash } from "lucide-react";
import React, { useState } from "react";

export default function TaskRow({
    task,
    onUpdate,
    onDelete,
} : {
    task: Task;
    onUpdate: (input: UpdateTaskInput) => void;
    onDelete: (input: DeleteTaskInput) => void;
}) {
    const [taskTitle, setTaskTitle] = useState(task.title);

    return (
        <React.Fragment key={task.id}>
        <li className="group flex flex-row justify-between pt-5 pb-5 m-0">
            <input type="checkbox" checked={task.status}
                onChange={() => onUpdate({ id: task.id, status: !task.status})}/>
            <input className="task-name" defaultValue={task.title} onChange={(e) => setTaskTitle(e.target.value)}/>
            <span className="invisible group-hover:visible flex flex-row justify-between gap-2">
                <SquarePen className="hover:text-blue-600 transition-colors duration-100"
                    onClick={() => onUpdate({ id: task.id, title: taskTitle })}/>
                <Trash className="hover:text-red-700 transition-colors duration-100"
                    onClick={() => onDelete({ id: task.id })}/>
            </span>
        </li>
        <hr className="border-slate-200"/>
        </React.Fragment>
    )
}