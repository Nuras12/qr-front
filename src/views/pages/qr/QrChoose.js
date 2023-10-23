import React, { useEffect, useState } from 'react'
import { CButton, CButtonGroup, CRow, CContainer } from '@coreui/react'
import { api } from 'src/api'
import { useNavigate, useParams } from 'react-router-dom'
const Login = () => {
  const [ticket, setTicket] = useState({ available: 0, total: 0 })
  const [message, setMessage] = useState('')
  const [divId, setDivId] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const call = async () => {
      try {
        const ticket_ = await api.qrApi.getTicketById(id)
        setTicket(ticket_)
        console.log('ticket_', ticket_)
      } catch (error) {
        console.log(error)
        setMessage(error?.response.data.message)
      }
    }

    call()
  }, [id])

  const apply = async (num) => {
    try {
      await api.qrApi.apply(id, num)
      const ticket_ = await api.qrApi.getTicketById(id)
      setTicket(ticket_)
      console.log('ticket_', ticket_)
      back()
    } catch (error) {
      console.log(error?.response.data)
      setMessage(error?.response.data.message)
    }
  }

  const applyAll = async () => {
    try {
      await api.qrApi.apply(id, ticket.available)
      back()
    } catch (error) {
      console.log(error?.response.data)
      setMessage(error?.response.data.message)
    }
  }

  const back = async (toBlink = true) => {
    if (toBlink) {
      setDivId('blink')
      setTimeout(() => navigate('/qr'), 2000)
      return
    }

    navigate('/qr')
  }

  return (
    <CContainer className="h-100 min-vh-100" id={divId}>
      <header className="header ">
        <h2>QR-чекер</h2>
      </header>
      <CContainer>
        <CButtonGroup role="group" aria-label="Basic example">
          <CRow xs className="justify-content-center">
            {[...Array(ticket.total).keys()].map((num, idx) => (
              <div className="col-4" key={idx}>
                <CButton
                  xs={12}
                  style={{ width: '80px', height: '80px', fontSize: 38 }}
                  className="p-2 m-2 "
                  color={num + 1 > ticket.available ? 'secondary' : 'success'}
                  disabled={num + 1 > ticket.available}
                  onClick={() => apply(num + 1)}
                >
                  {num + 1}
                </CButton>
              </div>
            ))}
          </CRow>
        </CButtonGroup>

        <CRow className="mt-3">
          <div className="col-6">
            <CButton
              xs={12}
              color="primary"
              className="border"
              style={{ fontSize: 24, height: '80px' }}
              disabled={ticket.available <= 0}
              onClick={() => applyAll()}
            >
              Пропустить всех
            </CButton>
          </div>
          <div className="col-6">
            <CButton
              xs={12}
              color="primary"
              className="border"
              style={{ fontSize: 24, height: '80px' }}
              onClick={() => back(false)}
            >
              Сканировать другой
            </CButton>
          </div>
        </CRow>

        {/* <p style={{ fontSize: 40, color: 'blue', textAlign: 'center', marginBottom: '0px' }}>
          ИВЕНТ: MILLER
        </p> */}
        {/* <p style={{ textAlign: 'center', fontSize: 40, color: 'blue' }}>28.10</p> */}
        <p style={{ textAlign: 'center', fontSize: 40, color: 'grey' }} className="mt-3">
          БИЛЕТОВ:
        </p>
        <p style={{ textAlign: 'center', fontSize: 120, color: 'grey' }}>
          <span style={{ color: '#321fdb' }}> {ticket.available}</span>/{ticket.total}
        </p>
      </CContainer>

      <div>{message}</div>
    </CContainer>
  )
}

export default Login
