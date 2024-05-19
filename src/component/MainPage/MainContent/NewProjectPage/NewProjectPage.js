import React, { useState } from 'react';

const NewProjectPage = () => {
    const [projectTitle, setProjectTitle] = useState('');

    const handleCreateProject = () => {
        console.log('Creating new project:', projectTitle);
    };

    return (
        <div>
            <h1>Create a New Project</h1>
            <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Project Title"
            />
            <button onClick={handleCreateProject}>Create Project</button>
        </div>
    );
};

export default NewProjectPage;
