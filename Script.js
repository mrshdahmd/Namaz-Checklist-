document.addEventListener('DOMContentLoaded', () => {
    const tasks = document.querySelectorAll('input[type="checkbox"]');
    const progress = document.getElementById('progress');
    const progressBar = document.getElementById('progress-bar');
    const resetButton = document.getElementById('reset');

    const updateProgress = () => {
        const completedTasks = [...tasks].filter(task => task.checked).length;
        const totalTasks = tasks.length;
        const percentage = Math.round((completedTasks / totalTasks) * 100);

        progress.textContent = `${percentage}%`;
        progressBar.value = completedTasks;
    };

    tasks.forEach(task => {
        task.addEventListener('change', updateProgress);
    });

    resetButton.addEventListener('click', () => {
        tasks.forEach(task => (task.checked = false));
        updateProgress();
    });

    // Reset checklist daily
    const resetDaily = () => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        const timeUntilMidnight = midnight - now;

        setTimeout(() => {
            tasks.forEach(task => (task.checked = false));
            updateProgress();
            resetDaily(); // Schedule next reset
        }, timeUntilMidnight);
    };

    resetDaily();
});
