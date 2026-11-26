'use client'

import { useTRPC } from "@/src/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SquarePen, Trash } from "lucide-react";
import React, { useState } from "react";

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

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                createTask.mutate({ title });
            }} className="flex gap-5 mb-8">
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
            <ul>
                {tasks?.map((task) =>
                    <React.Fragment key={task.id}>
                        <li className="flex flex-row justify-between pt-5 pb-5 m-0">
                            <input defaultValue={task.title}/>
                            <span className="flex flex-row justify-between gap-2">
                                <SquarePen className="hover:text-blue-600 transition-colors duration-100"/>
                                <Trash className="hover:text-red-700 transition-colors duration-100"/>
                            </span>
                        </li>
                        <hr className="border-slate-200"/>
                    </React.Fragment>
                )}
            </ul>
        </div>
    )
}