import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './IssueBoard.css';
import IssueItem from './IssueItem';

const IssueBoard = ({ issues, setIssues }) => {
    const [sortOption, setSortOption] = useState('reportedDate');
    const [searchFilters, setSearchFilters] = useState({
        title: '',
        description: '',
        reporter: '',
        fixer: '',
        assignee: '',
        priority: '',
        status: '',
        startDate: '',
        endDate: '',
    });
    const [filteredIssues, setFilteredIssues] = useState([]);
    const navigate = useNavigate();
    const { projectId } = useParams();

    useEffect(() => {
        const filtered = filterIssues(issues, searchFilters);
        const sorted = sortIssues(filtered, sortOption);
        setFilteredIssues(sorted);
    }, [searchFilters, issues, sortOption]);

    const sortIssues = (issuesToSort, option) => {
        let sortedIssues = [...issuesToSort];
        switch (option) {
            case 'title':
            case 'description':
            case 'reporter':
            case 'fixer':
            case 'assignee':
            case 'priority':
            case 'status':
                sortedIssues.sort((a, b) => a[option].localeCompare(b[option]));
                break;
            case 'reportedDate':
                sortedIssues.sort((a, b) => new Date(b.reportedDate) - new Date(a.reportedDate));
                break;
            default:
                break;
        }
        return sortedIssues;
    };

    const filterIssues = (issuesToFilter, filters) => {
        return issuesToFilter.filter(issue => {
            const matchesTitle = !filters.title || (typeof issue.title === 'string' && issue.title.toLowerCase().includes(filters.title.toLowerCase()));
            const matchesDescription = !filters.description || (typeof issue.description === 'string' && issue.description.toLowerCase().includes(filters.description.toLowerCase()));
            const matchesReporter = !filters.reporter || (typeof issue.reporter === 'string' && issue.reporter.toLowerCase().includes(filters.reporter.toLowerCase()));
            const matchesFixer = !filters.fixer || (typeof issue.fixer === 'string' && issue.fixer.toLowerCase().includes(filters.fixer.toLowerCase()));
            const matchesAssignee = !filters.assignee || (typeof issue.assignee === 'string' && issue.assignee.toLowerCase().includes(filters.assignee.toLowerCase()));
            const matchesPriority = !filters.priority || issue.priority === filters.priority;
            const matchesStatus = !filters.status || issue.status === filters.status;
            const matchesDateRange = (!filters.startDate || new Date(issue.reportedDate) >= new Date(filters.startDate)) &&
                (!filters.endDate || new Date(issue.reportedDate) <= new Date(filters.endDate));

            return matchesTitle && matchesDescription && matchesReporter && matchesFixer && matchesAssignee && matchesPriority && matchesStatus && matchesDateRange;
        });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleFilterClear = () => {
        setSearchFilters({
            title: '',
            description: '',
            reporter: '',
            fixer: '',
            assignee: '',
            priority: '',
            status: '',
            startDate: '',
            endDate: '',
        });
    };

    const addIssue = (title) => {
        const newIssue = {
            id: issues.length + 1,
            title: title,
            description: 'New issue description',
            reporter: 'Unknown',
            reportedDate: new Date(),
            fixer: 'Unknown',
            assignee: 'Unknown',
            priority: 'MEDIUM',
            status: 'NEW',
        };
        setIssues([...issues, newIssue]);
    };

    const handleNewIssue = () => {
        const title = prompt('Enter issue title:');
        if (title) addIssue(title);
    };

    return (
        <div className="issue-board">
            <button className="back-button" onClick={() => navigate(`/project/${projectId}`)}>Back</button>
            <h1>Issue Board</h1>
            <div className="controls">
                <div className="sort-control">
                    <label>Sort by: </label>
                    <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
                        <option value="reportedDate">Reported Date</option>
                        <option value="title">Title</option>
                        <option value="description">Description</option>
                        <option value="reporter">Reporter</option>
                        <option value="fixer">Fixer</option>
                        <option value="assignee">Assignee</option>
                        <option value="priority">Priority</option>
                        <option value="status">Status</option>
                    </select>
                </div>
            </div>
            <div className="filter-controls">
                <input
                    type="text"
                    name="title"
                    placeholder="Search by Title"
                    value={searchFilters.title}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Search by Description"
                    value={searchFilters.description}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="reporter"
                    placeholder="Search by Reporter"
                    value={searchFilters.reporter}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="fixer"
                    placeholder="Search by Fixer"
                    value={searchFilters.fixer}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="assignee"
                    placeholder="Search by Assignee"
                    value={searchFilters.assignee}
                    onChange={handleFilterChange}
                />
                <select
                    name="priority"
                    value={searchFilters.priority}
                    onChange={handleFilterChange}
                >
                    <option value="">All Priorities</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                </select>
                <select
                    name="status"
                    value={searchFilters.status}
                    onChange={handleFilterChange}
                >
                    <option value="">All Statuses</option>
                    <option value="NEW">New</option>
                    <option value="ASSIGNED">Assigned</option>
                    <option value="FIXED">Fixed</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="CLOSED">Closed</option>
                </select>
                <input
                    type="date"
                    name="startDate"
                    value={searchFilters.startDate}
                    onChange={handleFilterChange}
                />
                <input
                    type="date"
                    name="endDate"
                    value={searchFilters.endDate}
                    onChange={handleFilterChange}
                />
                <button className="clear-filter-button" onClick={handleFilterClear}>Filter Clear</button>
            </div>
            <button className="new-issue-button" onClick={handleNewIssue}>New Issue</button>
            <div className="issue-list">
                {filteredIssues.map((issue) => (
                    <IssueItem key={issue.id} issue={issue} />
                ))}
            </div>
        </div>
    );
};

export default IssueBoard;
