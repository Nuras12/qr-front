import React from 'react'
import { CButton, CRow, CContainer } from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'

const GreyMessage = () => {
  const { id } = useParams()
  console.log(id, 'ID')
  const messages = {
    1: 'Данный билет не имеет доступных сканирований',
    2: 'Билет не найден',
    3: 'Билет отозван',
    4: 'QR не распознан',
  }
  const navigate = useNavigate()

  const back = async () => {
    navigate('/qr')
  }

  return (
    <CContainer className="p-4 m-1">
      <header className="header ">
        <h2>QR-чекер</h2>
      </header>
      <CContainer>
        <p style={{ textAlign: 'center', fontSize: 30, color: 'grey' }} className="mt-3">
          {messages[id] || id}
        </p>
        <CRow className="mt-3">
          <div className="d-flex justify-content-center">
            <CButton
              xs={12}
              color="primary"
              className="border"
              style={{ fontSize: 24, height: '80px' }}
              onClick={() => back()}
            >
              Сканировать другой
            </CButton>
          </div>
        </CRow>
      </CContainer>
    </CContainer>
  )
}

export default GreyMessage
