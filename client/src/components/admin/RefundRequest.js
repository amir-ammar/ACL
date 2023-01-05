import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function RefundRequest() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });
  const [refundrequest, setrefund] = useState([]);
  const [opensnake, setopensnake] = useState(false);
  const [message, setmessage] = useState('');
  const [typemessage, settypemessage] = useState('');
  const [progress, setprogress] = useState(true);
  const [refersh, setrefersh] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/admin/refund`)
      .then((res) => {
        console.log(res.data);
        setrefund(res.data);
        setprogress(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refersh]);

  const approve = (RefundId, state, courseId1) => {
    setprogress(true);
    setrefersh(!refersh);
    // id.preventDefault();
    axios
      .patch(`http://localhost:8080/api/v1/admin/updaterefund`, {
        RefundId: RefundId,
        state: state,
        courseId1: courseId1,
      })
      .then((res) => {
        console.log(res.data);

        setrefund((old) =>
          old.map((report) => {
            if (report._id == RefundId) {
              return res.data;
            } else {
              return report;
            }
          })
        );
        setprogress(false);
        setopensnake(true);
        setmessage('the Refund has been ' + state + 'd');
        settypemessage('success');
      })
      .catch((err) => {
        console.log(err);
        setopensnake(true);
        setmessage(err);
        settypemessage('error');
      });
  };

  return (
    <>
      <div class='container mt-3'>
        <h2>Refund Requests</h2>

        <table class='table  table-hover bg-light border border-success '>
          <thead>
            <tr>
              <th>UserName</th>
              <th>Course</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {refundrequest.map((report) => (
              <tr>
                <td>{report.user.username}</td>
                <td>{report.course.title}</td>
                <td>{report.state}</td>
                <td>
                  {' '}
                  {report.state === 'pending' && (
                    <button
                      type='button'
                      class='btn btn-primary'
                      onClick={() => {
                        approve(report._id, 'approved', report.course._id);
                      }}
                    >
                      approve
                    </button>
                  )}
                </td>
                <td>
                  {' '}
                  {report.state === 'pending' && (
                    <button
                      type='button'
                      class='btn btn-primary'
                      onClick={() => {
                        approve(report._id, 'rejected', report.course._id);
                      }}
                    >
                      rejected
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={opensnake}
        onClose={opensnake}
        message={message}
        key={'top' + 'center'}
      >
        <Alert
          onClose={() => setopensnake(false)}
          severity={typemessage}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
}

export default RefundRequest;
