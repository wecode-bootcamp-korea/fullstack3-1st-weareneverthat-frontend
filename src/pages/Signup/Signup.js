import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from '../../components/Topnav/Topnav';
import Footer from '../../components/Footer/Footer';
import './Signup.scss';

function Signup() {
	const [nameValue, setNameValue] = useState('');
	const [emailValue, setEmailValue] = useState('');
	const [pwValue, setPwValue] = useState('');
	const [isAlertVisibility, setIsAlertVisibility] = useState(false);
	const [isFormVisibility, setIsFormVisibility] = useState(true);
	const [isSuccessVisibility, setIsSuccessVisibility] = useState(false);

	const handleNameInput = e => {
		setNameValue(e.target.value);
	};

	const handleEmailInput = e => {
		setEmailValue(e.target.value);
	};

	const handlePwInput = e => {
		setPwValue(e.target.value);
	};

	const navigate = useNavigate();

	const regexId =
		/^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/i;

	const regexPw = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8}/;

	const goToLogin = () => {
		navigate('/users/login');
	};

	const signupLogic = () => {
		if (regexId.test(emailValue) && regexPw.test(pwValue)) {
			console.log(regexId.test(emailValue) && regexPw.test(pwValue));
			fetch(`${process.env.REACT_APP_SERVER_HOST}/users/signup`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				mode: 'cors',
				body: JSON.stringify({
					name: nameValue,
					email: emailValue,
					password: pwValue,
				}),
			}).then(res => {
				if (res.status === 201) {
					setIsFormVisibility(false);
					setIsSuccessVisibility(true);
					// navigate('/');
				} else if (res.status === 400) {
					setIsAlertVisibility(true);
				}
			});
		} else {
			setIsAlertVisibility(true);
		}
	};

	return (
		<div className="sign">
			<Topnav />
			<div className="Signup">
				<div className="pageInfo">
					<div className="accountBox" onClick={goToLogin}>
						Account
					</div>
					<div className="createAccountBox">Create&nbsp;account</div>
				</div>
				<section
					className="signUpWrapper"
					style={{ visibility: isFormVisibility ? 'visible' : 'hidden' }}
				>
					<form className="inputBox">
						<section className="nameInput">
							<div>??????</div>
							<input
								type="text"
								placeholder="??????"
								value={nameValue}
								onChange={handleNameInput}
							></input>
						</section>
						<section className="emailInput">
							<div>?????????</div>
							<input
								type="text"
								placeholder="?????????"
								value={emailValue}
								onChange={handleEmailInput}
							></input>
						</section>
						<section className="pwInput">
							<div>????????????</div>
							<input
								type="password"
								placeholder="????????????"
								value={pwValue}
								onChange={handlePwInput}
							></input>
						</section>
					</form>
					<section className="signupBtn">
						<button onClick={signupLogic}>CREATE ACCOUNT</button>
					</section>
					<section className="returnLogin" onClick={goToLogin}>
						<div>??????????????? ????????????</div>
					</section>
					<section
						className="alert"
						style={{ visibility: isAlertVisibility ? 'visible' : 'hidden' }}
					>
						<div>
							????????? ??????????????????.
							<br />
							<br />
							????????? ????????? ???????????? 8??? ????????? ?????? ????????????, ??????, ??????????????? ????????? ???????????????
							??????????????????.
						</div>
					</section>
				</section>
				<section
					className="successCreate"
					style={{ visibility: isSuccessVisibility ? 'visible' : 'hidden' }}
				>
					??????????????? ?????????????????????!
					<br />
					<br />
					????????? ??? ?????? ????????????.
					<br />
					<br />
					weareneverthat??
				</section>
			</div>
			<Footer />
		</div>
	);
}

export default Signup;
