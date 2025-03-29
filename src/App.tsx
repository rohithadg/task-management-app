import TaskListPage from "./pages/TaskListPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <TaskListPage />
      </main>
      
      <footer className="max-w-4xl mx-auto px-4 py-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Task Manager
      </footer>
    </div>
  );
}

export default App;