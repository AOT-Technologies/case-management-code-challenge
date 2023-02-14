import { Typography } from '@mui/material'
import React from 'react'
import "./CaseDetailData.scss"

interface CaseDetailDataProps {
  name:String,
  date:any,
  owner:String,
  caseDescription:String,
  tasks:any,
  caseType: any,
  lobCaseId : number
}

const CaseDetailData = ({name,date,owner,caseDescription,tasks,caseType,lobCaseId}:CaseDetailDataProps) => {
  return (
    <>
      <div className="case-details">
        <div className="case-detail-name">
          <Typography variant='subtitle1'>
          Case name
          </Typography>
          <Typography variant='body2'>
          {name}
          </Typography>

        </div>
        <div className="case-detail-date">
          <Typography variant='subtitle1'>Start Date</Typography >
          <Typography variant='body2'>
            {date}
          </Typography>
        </div>
        <div className="case-detail-owner">
          <Typography variant='subtitle1'>Owner</Typography >
          <Typography variant='body2'>
            {owner}
          </Typography>
        </div>
        <div>
          <Typography variant='subtitle1'>Case Description</Typography >
          <Typography variant='body2'>
            {caseDescription}
          </Typography>
        </div>
        <div>
          <Typography variant='subtitle1'>Case Type</Typography >
          <Typography variant='body2'>
            {caseType?.displayname}
          </Typography>
        </div>
        <div>
          <Typography variant='subtitle1'>LOB ID</Typography >
          <Typography variant='body2'>
            {lobCaseId}
          </Typography>
        </div>
      </div>
  
      <div className="case-tasks">
        <Typography variant='subtitle1'>Current Task(s)</Typography >
        { (tasks && tasks.length) ? tasks.map((task: any, index: any) => (
          <Typography variant='body2' key={index}>
            {task.name}
          </Typography>
        )) : ""}
      </div>
    </>
  );
}

export default CaseDetailData
