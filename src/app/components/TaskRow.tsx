import { DeleteTaskInput, Task, UpdateTaskInput } from "@/src/shared/schemas/task.schema";
import { SquarePen, Trash } from "lucide-react";
import React, { useState } from "react";

export default function TaskRow({
    task,
    onUpdate,
    onDelete,
}: {
    task: Task;
    onUpdate: (input: UpdateTaskInput) => void;
    onDelete: (input: DeleteTaskInput) => void;
}) {
    const initialTitle = task.title;
    const [taskTitle, setTaskTitle] = useState(task.title);

    return (
        <li className="group flex flex-row justify-between pt-5 pb-5 m-0">
            <input type="checkbox" checked={task.status}
                onChange={() => onUpdate({ id: task.id, status: !task.status })} />
            <input className={task.status ? "text-slate-400" : ""} defaultValue={task.title} onChange={(e) => setTaskTitle(e.target.value)} />
            <span className="invisible group-hover:visible flex flex-row justify-between gap-2">
                <button type="button" disabled={initialTitle === taskTitle} onClick={() => onUpdate({ id: task.id, title: taskTitle })}>
                    <SquarePen className={`${initialTitle === taskTitle ?
                        "text-slate-200" : "hover:text-blue-600"}
                        transition-colors duration-100`} />
                </button>
                <Trash className="hover:text-red-700 transition-colors duration-100"
                    onClick={() => onDelete({ id: task.id })} />
            </span>
        </li>
    )
}