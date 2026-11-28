import TaskList from "./components/TaskList";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center font-sans min-h-0 overflow-hidden">
      <TaskList />
    </div>
  );
}
