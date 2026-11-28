'use client'

import { useTRPC } from "@/src/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import TaskRow from "./TaskRow";

export default function TaskList() {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const [title, setTitle] = useState("");

    const { data: tasks, isLoading } = useQuery(trpc.task.getAll.queryOptions());

    const createTask = useMutation(
        trpc.task.create.mutationOptions({
            onSuccess: () => {
                setTitle('');
                queryClient.invalidateQueries({ queryKey: trpc.task.getAll.queryKey() });
            },
        }),
    );

    const deleteTask = useMutation(
        trpc.task.delete.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: trpc.task.getAll.queryKey() });
            }
        })
    );

    const updateTask = useMutation(
        trpc.task.update.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: trpc.task.getAll.queryKey() });
            }
        })
    );

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="flex flex-col h-full min-h-0 overflow-hidden p-10">
            <div className="shrink-0">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    createTask.mutate({ title });
                }} className="flex flex-row gap-3 mb-8">
                    <input
                        value={title}
                        placeholder="Type the task name here"
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-3 border border-gray-400 rounded-md focus:border-gray-700"
                    />
                    <button
                        disabled={createTask.isPending}
                        type="submit"
                        className="bg-slate-500 p-3 w-[80] rounded-full text-slate-50 hover:bg-slate-700 transition-colors">
                        Add
                    </button>
                </form>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden">
                <ul>
                    {tasks !== undefined && tasks.length > 0
                        ? tasks.map((task, index) =>
                            <React.Fragment key={task.id}>
                                <TaskRow task={task} onUpdate={updateTask.mutate} onDelete={deleteTask.mutate} />
                                {
                                    index !== tasks.length - 1 &&
                                    <hr className="border-slate-200" />
                                }
                            </React.Fragment>
                        ) : (
                            <li className="justify-center text-center pt-5 pb-5 m-0">
                                <p className="text-slate-500">No task created yet.</p>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}