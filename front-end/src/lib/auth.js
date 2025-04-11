export const API_HOST = `${window.location.protocol}//${window.location.host}`
console.log(API_HOST)
export async function register(user_name, email, password, otp){
       const data=  await makeRequest(`${API_HOST}/register`,"POST", {user_name, email, password, otp:Number.parseInt(otp)})
        return data
}
export async function login(email, password){
       const data=  await makeRequest(`${API_HOST}/login/`,"POST", {email, password})
        return data
}

export async function sendOtp(email){
    const res = await fetch(`${API_HOST}/register/otp`,{
        method:"POST",
        headers: {
            'Content-Type':'Application/json'
        },
        body:JSON.stringify({
            email
        })
    })
    if(!res.ok) throw Error("error while generation otp")
    const json = await res.json() 
    return json
}

export function getFormDataObject(form, submitter) {
	const formData = new FormData(form, submitter);
	const data = {};
	for(const [key, value] of formData.entries()){
		data[key] = value;
	}
	// console.log(data);
	return data;
}

export async function 	makeRequest(url, method, data = {}) {
	try {
		const reqObj = {
			method: method,
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
			}, // set nothing
			body: JSON.stringify(data),
		};
		if (["GET", "HEAD"].includes(method.toUpperCase())) reqObj.body = undefined;
		const response = await fetch(url, reqObj);

		if (!response.ok) {
			const data = await response.json();
			console.dir(data);
			throw new Error(data?.message || "Unknown Error!");
		}

		return await response.json();
	} catch (error) {
		console.dir("Fetch request failed", error);
		throw error;
	}
}

export async function makeSecureRequest(url, method, data) {
		const token = getItemWithExpiry('token');

		if (!token) {
			throw new Error("Log in/ Register to Perform This action");
		}
		const fetchOptions = {
			method: method,
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-type": "application/json",
				Accept: "application/json",
			}, // set JWT token with Bearer prefix
			body: JSON.stringify(data),
		}
		if (["GET", "HEAD"].includes(method.toUpperCase())) fetchOptions.body = undefined; // get requests have no body 
		const response = await fetch(url, fetchOptions);

		if (!response.ok) {
			const data = await response.json();
			console.dir(data);
			throw new Error(data?.message || "Unknown Error!");
		}

		return await response.json();
}

export function setItemWithExpiry(key, value, ttl) {
	const now = new Date();
	const item = {
		value: value, // The actual data
		expiry: now.getTime() + ttl // Expiry time in milliseconds
	};
	localStorage.setItem(key, JSON.stringify(item));
}

export function getItemWithExpiry(key) {
	try {
		const itemStr = localStorage.getItem(key);
		if (!itemStr) {
			return null; // Item does not exist
		}
		const item = JSON.parse(itemStr);

		const now = new Date();

		// Compare the expiry time with the current time
		if (now.getTime() > item.expiry) {
			localStorage.removeItem(key); // Remove the expired item
			return null; // Indicate the item has expired
		}
		return item.value; // Return the value if not expired
	} catch (error) {
		console.warn("error", error)
		return null;
	}
}