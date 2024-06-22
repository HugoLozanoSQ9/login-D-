const API_URL = "https://desaf-obackend.onrender.com"

export function login(user) {

    return fetch(`${API_URL}/auth/login`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: user.email,
                password:user.password
            })
        }
    )
        .then((response) => response.json())
        .then((data)=> data)
        

}

