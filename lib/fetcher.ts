export async function apiFetch(
endpoint: string,
options: RequestInit = {}
) {
const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
...options,
headers: {
'Content-Type': 'application/json',
...(options.headers || {}),
},
credentials: 'include',
})


if (!res.ok) {
const error = await res.json()
throw new Error(error.message || 'Request failed')
}


return res.json()
}