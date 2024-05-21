import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import './ProjectProgress.css';

// Register the necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const ProjectProgress = ({ projectData }) => {
    const { startDate, issues } = projectData;
    const currentDate = new Date();
    const start = new Date(startDate);
    const daysElapsed = Math.ceil((currentDate - start) / (1000 * 60 * 60 * 24));

    const totalIssues = issues.length;
    const completedIssues = issues.filter(issue => issue.status === 'CLOSED' || issue.status === 'RESOLVED' || issue.status === 'FIXED').length;
    const remainingIssues = totalIssues - completedIssues;
    const completionPercentage = totalIssues === 0 ? 0 : Math.round((completedIssues / totalIssues) * 100);

    const issuesPerDay = totalIssues / daysElapsed;
    const issuesPerMonth = issuesPerDay * 30;

    // Count issues by status
    const statusCounts = issues.reduce((acc, issue) => {
        acc[issue.status] = (acc[issue.status] || 0) + 1;
        return acc;
    }, {});

    const doughnutDataByStatus = {
        labels: ['NEW', 'ASSIGNED', 'FIXED', 'RESOLVED', 'CLOSED'],
        datasets: [
            {
                data: [
                    statusCounts['NEW'] || 0,
                    statusCounts['ASSIGNED'] || 0,
                    statusCounts['FIXED'] || 0,
                    statusCounts['RESOLVED'] || 0,
                    statusCounts['CLOSED'] || 0,
                ],
                backgroundColor: ['#007bff', '#ffc107', '#17a2b8', '#28a745', '#dc3545'],
                hoverBackgroundColor: ['#0056b3', '#e0a800', '#138496', '#218838', '#c82333'],
            },
        ],
    };

    const barData = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                label: 'Issues',
                data: [completedIssues, remainingIssues],
                backgroundColor: ['#28a745', '#dc3545'],
            },
        ],
    };

    const doughnutData = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                data: [completedIssues, remainingIssues],
                backgroundColor: ['#28a745', '#dc3545'],
                hoverBackgroundColor: ['#218838', '#c82333'],
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
    };

    return (
        <div className="project-progress">
            <h2>Project Progress</h2>
            <div className="progress-metrics">
                <p>Days since start: {daysElapsed}</p>
                <p>Total issues: {totalIssues}</p>
                <p>Completed issues: {completedIssues}</p>
                <p>Remaining issues: {remainingIssues}</p>
                <p>Completion percentage: {completionPercentage}%</p>
            </div>
            <div className="progress-charts">
                <div className="bar-chart">
                    <h3>Issues Status</h3>
                    <div className="chart-container">
                        <Bar data={barData} options={options} />
                    </div>
                </div>
                <div className="doughnut-chart">
                    <h3>Completion Percentage</h3>
                    <div className="chart-container">
                        <Doughnut data={doughnutData} options={options} />
                    </div>
                </div>
                <div className="doughnut-chart">
                    <h3>Issues by Status</h3>
                    <div className="chart-container">
                        <Doughnut data={doughnutDataByStatus} options={options} />
                    </div>
                </div>
            </div>
            <div className="issue-rate">
                <div className="issue-rate-box">
                    <h3>Issues per Day</h3>
                    <p>{issuesPerDay.toFixed(2)}</p>
                </div>
                <div className="issue-rate-box">
                    <h3>Issues per Month</h3>
                    <p>{issuesPerMonth.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectProgress;
