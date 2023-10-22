import React, { useEffect, useState } from 'react'
import { CButton, CButtonGroup, CRow, CContainer } from '@coreui/react'
import { api } from 'src/api'
import { useNavigate, useParams } from 'react-router-dom'
const Login = () => {
  const [ticket, setTicket] = useState({ available: 0, total: 0 })
  const [message, setMessage] = useState('')
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
      navigate('/qr')
    } catch (error) {
      console.log(error?.response.data)
      setMessage(error?.response.data.message)
    }
  }

  const applyAll = async () => {
    try {
      await api.qrApi.apply(id, ticket.available)
      navigate('/qr')
    } catch (error) {
      console.log(error?.response.data)
      setMessage(error?.response.data.message)
    }
  }

  return (
    <CContainer className="p-4 m-1">
      <header className="header ">
        <h2>QR-чекер</h2>
      </header>
      <CContainer>
        <CButtonGroup role="group" aria-label="Basic example">
          <CRow xs className="justify-content-center">
            {[...Array(ticket.total).keys()].map((num, idx) => (
              <CButton
                key={idx}
                xs={12}
                style={{ width: '80px', height: '80px', fontSize: 38 }}
                className="p-2 m-2"
                color={num + 1 > ticket.available ? 'secondary' : 'success'}
                disabled={num + 1 > ticket.available}
                onClick={() => apply(num + 1)}
              >
                {num + 1}
              </CButton>
            ))}
          </CRow>
        </CButtonGroup>
        <p style={{ fontSize: 40, color: 'blue', textAlign: 'center', marginBottom: '0px' }}>
          ИВЕНТ: MILLER
        </p>
        <p style={{ textAlign: 'center', fontSize: 40, color: 'blue' }}>28.10</p>
        <p style={{ textAlign: 'center', fontSize: 40, color: 'grey' }}>БИЛЕТОВ:</p>
        <p style={{ textAlign: 'center', fontSize: 120, color: 'grey' }}>
          <span style={{ color: '#321fdb' }}> {ticket.available}</span>/{ticket.total}
        </p>

        {ticket.available > 0 ? (
          <CRow xs>
            <CButton
              xs={12}
              color="primary"
              className="border"
              style={{ fontSize: 24, height: '80px' }}
              onClick={() => applyAll()}
            >
              Пропустить всех
            </CButton>
          </CRow>
        ) : null}
      </CContainer>

      <div>{message}</div>
    </CContainer>
  )
}

export default Login
