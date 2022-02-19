import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';


let dialogs = [
    {id: 1, name: 'Andrey'},
    {id: 2, name: 'Ekaterina'},
    {id: 3, name: 'Dimych'},
    {id: 4, name: 'Alex'},
    {id: 5, name: 'Sergei'},
    {id: 6, name: 'Eva1'},
]

let posts = [
    {id: 1, message: 'Hello world', likesCount: 10},
    {id: 2, message: 'I like It-incubator', likesCount: 56},
    {id: 3, message: 'I learn React', likesCount: 35},
    {id: 4, message: 'I learn CSS', likesCount: 55},
]

let messages = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How is your it-incubator?'},
    {id: 3, message: 'Yo'},
]

test('renders learn react link', () => {
    render(<App dialogs={dialogs}
                messages={messages}
                posts={posts}/>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
