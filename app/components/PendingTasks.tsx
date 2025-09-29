type Task = {
  title: string;
  value: number;
  label: string;
};

interface PendingTasksProps {
  tasks: Task[];
}

export const PendingTasks = ({ tasks }: PendingTasksProps) => {
  return (
    <div className="bg-[#FFF5F5] rounded-lg p-6">
      <div className="flex flex-col md:flex-row  md:items-center justify-between gap-4">
        <h3 className="text-xl text-black font-family-apercu font-semibold">
          Peticiones pendientes
        </h3>

        <div className="flex flex-col md:w-1/2 md:flex-row gap-4 w-1/2 pl-4">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 w-full"
            >
              <div className="text-red-500 text-sm font-medium mb-1">
                {task.title}
              </div>

              <div className="flex flex-row items-center gap-2">
                <div className="text-black text-2xl font-semibold mb-1">
                  {task.value.toLocaleString()}
                </div>
                <div className="text-gray-500 text-sm font-semibold">
                  {task.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
