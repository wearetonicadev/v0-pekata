type TaskCategory = {
  title: string;
  items: {
    label: string;
    value: number;
  }[];
};

interface PendingTasksProps {
  tasks: TaskCategory[];
}

export const PendingTasks = ({ tasks }: PendingTasksProps) => {
  return (
    <div className="bg-[#FFF1F1] rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h3 className="text-xl text-black font-family-apercu font-semibold">
          Peticiones Enviadas
        </h3>

        <div className="flex flex-col w-full sm:w-1/2 md:flex-row gap-4 w-1/2 lg:pl-4">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 w-full"
            >
              <div className="text-[#BF0000] text-sm font-normal mb-3">
                {task.title}
              </div>

              <div>
                {task.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex flex-row items-center justify-between">
                    <div className="text-[#404040] text-sm font-normal">
                      {item.label}
                    </div>
                    <div className="text-black text-lg font-medium">
                      {item.value.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
