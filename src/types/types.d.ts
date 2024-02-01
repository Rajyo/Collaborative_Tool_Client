
type SocketType = {
    socket: Socket
}

type UserData = {
    roomName: string
    userName: string
    socketID: string
}

type MessageData = {
    text: string
    name: string
    room: string
    id: string
    socketID: string
}

type ScribbleBody = {
    messages: MessageData[]
    lastMessageRef: MutableRefObject<HTMLDivElement | null>
}

type ScribbleFooter = {
    typingStatus: string
    socket: Socket
}

type UserTyping = {
    userTyping: string
    room: string
}

type Config = {
    color: string
    size: number
}

type BeginDraw = {
    x: number
    y: number
}