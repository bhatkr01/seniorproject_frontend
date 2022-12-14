import { useState } from "react";
import styles from "./Login.module.css";
import {fetcher} from "../../fetch/";
import { useRouter } from 'next/router';
import Link from 'next/link'

export default function Login() {
	const router=useRouter()
	const [fields, setFields] = useState({
		email: "",
		password: "",
	});
	const handleChange = (e) => {
		setFields({
			...fields,
			[e.target.name]: e.target.value,
		});
	};
	

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetcher("token/", "POST", 'application/json',JSON.stringify(fields));
		console.log(response);
		localStorage.setItem('access_token', response.access);
		localStorage.setItem('refresh_token', response.refresh)
		router.push('/')
	};
	const logout = async (event) => {
		event.preventDefault();
		const response = await fetcher("accounts/logout/", "POST", 'application/json',JSON.stringify({'refresh':localStorage.getItem('refresh_token')}));
	localStorage.clear();
		router.push('/')
	};

	return (
		<main className={styles.main}>
			<h1><a href="/" className={styles.marketplace}>Luther Marketplace</a></h1>
			<div className={styles.upperbody}>
			<div className={styles.welcomebox}>
			<br></br>
            <h1 className={styles.welcome}>Welcome Back</h1>
            <h2 className={styles.details}>Please enter your details.</h2>
			<form>
				<input className={styles.email}
					type="text"
					id="email"
					name="email"
					placeholder="Email"
					required
					onChange={handleChange}
				/>
				<br></br>
				<input className={styles.password}
					type="password"
					placeholder="Password"
					id="password"
					name="password"
					required
					onChange={handleChange}
				/>
				<br></br>
				<input className={styles.checkbox}
					type="checkbox"
					id="remmeberme"
					name="remmeberme"
					required
					onChange={handleChange}
				/>
				<label htmlFor="remmeberme" className={styles.checklabel}>Remember Me</label>
	  <Link className={styles.linklayer1} href="/reset-password">
			Forgot Password
	  </Link>
            	<br></br>
				<button className={styles.submit} type="button" onClick={handleSubmit}>
					Sign in
				</button>
            	<h4 className={styles.h4txt}>Don't have an account?

	  <Link className={styles.linklayer1} href="/signup">
			Create an account
	  </Link>
		</h4>
			</form>
			</div>
				<button className={styles.submit} type="button" onClick={logout}>
					Logout
				</button>
        </div>
		<div className={styles.imghalf}>
        	<img className={styles.structure} src="https://ak1.ostkcdn.com/images/products/is/images/direct/99e2126500ab99264a06f7bd2ddf7112a46dcb21/Art-Leon-Mid-century-3-seat-Sofa.jpg"></img>
    	</div>
		</main>
	);
}
