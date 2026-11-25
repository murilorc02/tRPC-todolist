'use client'

import { useTRPC } from "@/src/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

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
            <form onSubmit={(e) => { e.preventDefault(); createTask.mutate({ title }); }}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <button disabled={createTask.isPending}>Adicionar</button>
            </form>
            <ul>
                {tasks?.map((task) => <li key={task.id}>{task.title}</li>)}
            </ul>
        </div>
    )
}