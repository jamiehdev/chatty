using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

public class ChatHub : Hub
{
    private readonly ILogger<ChatHub> _logger;

    public ChatHub(ILogger<ChatHub> logger)
    {
        _logger = logger;
    }

    public async Task SendMessage(string user, string message)
    {
        // Get the current timestamp
        var timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

        // Format the message for the console
        var formattedMessage = $"{timestamp} - {user}: {message}";

        // Log the formatted message
        _logger.LogInformation(formattedMessage);

        // Broadcast the message to all clients
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public void NotifyBackendOfConnection(string message, string user)
    {
        Console.WriteLine(message);
    }
}
