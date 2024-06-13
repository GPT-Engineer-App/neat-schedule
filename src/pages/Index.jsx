import React, { useState } from 'react';
import { Container, VStack, HStack, Input, Button, Checkbox, Text, IconButton } from "@chakra-ui/react";
import { FaTrash, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false, votes: 0 }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const upvoteTask = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, votes: task.votes + 1 } : task
    );
    setTasks(newTasks);
  };

  const downvoteTask = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, votes: task.votes - 1 } : task
    );
    setTasks(newTasks);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} w="100%">
        <HStack w="100%">
          <Input 
            placeholder="Add a new task" 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)} 
          />
          <Button onClick={addTask} colorScheme="teal">Add Task</Button>
        </HStack>
        <VStack w="100%" spacing={3}>
          {tasks.map((task, index) => (
            <HStack key={index} w="100%" justifyContent="space-between">
              <Checkbox 
                isChecked={task.completed} 
                onChange={() => toggleTaskCompletion(index)}
              >
                <Text as={task.completed ? "s" : ""}>{task.text}</Text>
              </Checkbox>
              <HStack>
                <IconButton 
                  aria-label="Upvote task" 
                  icon={<FaThumbsUp />} 
                  onClick={() => upvoteTask(index)} 
                  colorScheme="green"
                />
                <Text>{task.votes}</Text>
                <IconButton 
                  aria-label="Downvote task" 
                  icon={<FaThumbsDown />} 
                  onClick={() => downvoteTask(index)} 
                  colorScheme="red"
                />
                <IconButton 
                  aria-label="Delete task" 
                  icon={<FaTrash />} 
                  onClick={() => deleteTask(index)} 
                  colorScheme="red"
                />
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;