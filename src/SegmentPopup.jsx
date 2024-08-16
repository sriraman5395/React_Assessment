import React, { useState } from 'react';
import './SegmentPopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {  faCircle } from '@fortawesome/free-solid-svg-icons';
import { faEllipsis,faPlus  } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';


const SegmentPopup = ({ onClose }) => {
  const [dropdowns, setDropdowns] = useState([]);
 

  const schemaOptions = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" }
  ];

  const handleChange = (id, event) => {
    const newDropdowns = dropdowns.map(dropdown => 
      dropdown.id === id ? { ...dropdown, value: event.target.value } : dropdown
    );
    setDropdowns(newDropdowns);
  };

  const addNewDropdown = () => {
    const newId = dropdowns.length + 1;
    setDropdowns([...dropdowns, { id: newId, value: '' }]);
  };

  const getAvailableOptions = (currentId) => {
    const selectedValues = dropdowns.filter(d => d.id !== currentId).map(d => d.value);
    return schemaOptions.filter(option => !selectedValues.includes(option.value));
  };

  const handleSave = async () => {
    const segmentData = {
      schema: dropdowns.map(dropdown => ({
        [dropdown.value]: schemaOptions.find(option => option.value === dropdown.value)?.label
      })).filter(item => Object.keys(item)[0] !== 'undefined')
    };

    try {
     
      const webhookUrl = 'https://webhook.site/11829654-d9e8-470e-9132-6c1a017b4596';

     
      const response = await axios.post(webhookUrl, segmentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Segment saved successfully:', response.data);
      onClose(); 
    } catch (error) {
      console.error('Error saving segment:', error);
    
    }
  };


  
  return (
    <div className="segment-popup">
      <div className="segment-popup-content">
        <div className='segment-container'>
          <button className="back-button" onClick={onClose}>
            <FontAwesomeIcon icon={faChevronLeft} style={{color: "#ffffff"}} size='lg' />
          </button>
          <p>Save Segment</p>

          
        </div>
<div className='segment-form'>
        <div >
          <h3>Enter the Name of the Segment</h3>
          <input 
            type="text" 
            
            placeholder="Name of the segment"
          />
        </div>
        <p>To save your segment, you need to add the schemas to build the query</p>



       <div className='schema-drop'>
        <div className="schema-options">
            <div className="schema-option">
              <FontAwesomeIcon icon={faCircle} className="icon green" />
              <span>User-Tasks</span>
            </div>
            <div className="schema-option">
              <FontAwesomeIcon icon={faCircle} className="icon red" />
              <span>Group-Tasks</span>
            </div>
          </div>


          
        
          <div className='drop'>
            {dropdowns.map((dropdown) => (
              <div key={dropdown.id} className="dropdown-icon-container">
                <FontAwesomeIcon icon={faCircle} className="icon" />
                <select
                  value={dropdown.value}
                  onChange={(e) => handleChange(dropdown.id, e)}
                  className="dropdown"
                >
                  <option value="" disabled>Add schema to segment</option>
                  {getAvailableOptions(dropdown.id).map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <button className="icon-button" aria-label="info">
                  <FontAwesomeIcon icon={faEllipsis} className="icon-in" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="add-segment-container">
            <button className="add-segment-button" onClick={addNewDropdown}>
              <FontAwesomeIcon icon={faPlus} className="plus-icon" />
              <span>Add new segment</span>
            </button>
          </div>

          
          </div>



          
      </div>
      <div className="button-container">
          <button className="save-button" onClick={handleSave}>Save the Segment</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SegmentPopup;