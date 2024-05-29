import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './IssueBoard.css';
import NewIssueComponent from './NewIssueComponent';
import IssueItem from './IssueItem';
import axios from "axios";

const initSearchFilters = {
    title: '',
    description: '',
    reporter: '',
    fixer: '',
    assignee: '',
    priority: '',
    status: '',
    startDate: '',
    endDate: '',
}

const initProjectData = {
    "id": 81,
    "name": "Project Alpha",
    "description": "This is alpha.",
    "members": {
        "User(id=332, username=admin, password=admin)": 8,
        "User(id=333, username=dev1, password=dev1)": 1,
        "User(id=334, username=adminPlTesterDev, password=all)": 15
    }
}

const initIssues = [
    { id: 1, title: 'Issue 1', description: 'Description 1', reporter: 'Alice', reportedDate: new Date('2024-05-01'), fixer: 'Bob', assignee: 'Charlie', priority: 'HIGH', status: 'NEW' },
    { id: 2, title: 'Issue 2', description: 'Description 2', reporter: 'Dave', reportedDate: new Date('2024-05-02'), fixer: 'Eve', assignee: 'Frank', priority: 'MEDIUM', status: 'CLOSED' },
    { id: 3, title: 'Issue 3', description: 'Description 3', reporter: 'Grace', reportedDate: new Date('2024-05-03'), fixer: 'Heidi', assignee: 'Ivan', priority: 'LOW', status: 'FIXED' },
    { id: 4, title: 'Issue 4', description: 'Description 4', reporter: 'Jack', reportedDate: new Date('2024-05-04'), fixer: 'Kathy', assignee: 'Leo', priority: 'CRITICAL', status: 'RESOLVED' },
    { id: 5, title: 'Issue 5', description: 'Description 5', reporter: 'Mallory', reportedDate: new Date('2024-05-05'), fixer: 'Niaj', assignee: 'Oscar', priority: 'HIGH', status: 'ASSIGNED' },
    { id: 6, title: 'Issue 6', description: 'Description 6', reporter: 'Pat', reportedDate: new Date('2024-05-06'), fixer: 'Quinn', assignee: 'Riley', priority: 'LOW', status: 'OPEN' },
    { id: 7, title: 'Issue 7', description: 'Description 7', reporter: 'Sam', reportedDate: new Date('2024-05-07'), fixer: 'Trudy', assignee: 'Uma', priority: 'CRITICAL', status: 'NEW' },
    { id: 8, title: 'Issue 8', description: 'Description 8', reporter: 'Victor', reportedDate: new Date('2024-05-08'), fixer: 'Wendy', assignee: 'Xander', priority: 'MEDIUM', status: 'ASSIGNED' },
    { id: 9, title: 'Issue 9', description: 'Description 9', reporter: 'Yara', reportedDate: new Date('2024-05-09'), fixer: 'Zane', assignee: 'Alice', priority: 'LOW', status: 'FIXED' },
    { id: 10, title: 'Issue 10', description: 'Description 10', reporter: 'Bob', reportedDate: new Date('2024-05-10'), fixer: 'Charlie', assignee: 'Dave', priority: 'HIGH', status: 'CLOSED' },
];

const IssueBoard = ({ userInfo }) => {
    const [sortOption, setSortOption] = useState('reportedDate');
    const [searchFilters, setSearchFilters] = useState(initSearchFilters);
    const [issues, setIssues] = useState(initIssues);
    const [filteredIssues, setFilteredIssues] = useState([]);
    const [showNewIssue, setShowNewIssue] = useState(false);
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [project, setProject] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
            params: {
                username: userInfo.username,
                password: userInfo.password,
            }
        }).then((response) => {
            setProject(response.data);
        }).catch((error) => {
            setProject(initProjectData);
            console.error("Fail to fetch CurrentPage Project : ", error);
        });
    }, [projectId, userInfo]);

    useEffect(() => {
        const fetchIssues = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}/projects/${projectId}/issues`, {
                params: {
                    username: userInfo.username,
                    password: userInfo.password,
                }
            }).then((response) => {
                setIssues(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.error("Fail to fetch Issues : ", error);
                setIssues(initIssues);
            });
        }
        fetchIssues();
    }, [projectId, userInfo]);

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

    const handleNewIssue = () => {
        setShowNewIssue(true);
    };

    const handleCloseNewIssue = () => {
        setShowNewIssue(false);
    };

    const handleIssueCreated = (newIssue) => {
        setIssues([...issues, newIssue]);
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
            {showNewIssue && (
                <NewIssueComponent
                    userInfo={userInfo}
                    project={project}
                    projectId={projectId}
                    onClose={handleCloseNewIssue}
                    onIssueCreated={handleIssueCreated}
                />
            )}
        </div>
    );
};

export default IssueBoard;