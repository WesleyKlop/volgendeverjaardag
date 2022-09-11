import { NextBirthdayForm } from '../app/NextBirthdayForm'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <>
    <NextBirthdayForm />

    <p className="text-slate-800">
      De volgende verjaardag in jouw vriendengroep snel vinden?&nbsp;
      <Link className="text-blue-500 hover:text-blue-600" to="/join">
        Registreer
      </Link>
      .
    </p>
  </>
)

export default Home
