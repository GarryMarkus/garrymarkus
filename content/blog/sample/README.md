---
title: "Lab 0x01: Advanced Network Security & Port Scanning"
date: "2026-06-25"
tags: ["nmap","networking"]
description: "A deep dive into bypassing modern firewall rules using decoy scans, custom timing templates, and packet fragmentation in Nmap."
readTime: 3
---

# Lab 0x01: Port Scanning & Firewall Evasion

In this write-up, we document standard techniques for identifying open ports and active services inside a secure subnetwork. High security zones often filter simple TCP Connect scans. We must use stealthier approaches.

## 1. Techniques Overview

- **Decoy Scans (`-D`)**: Send scans from spoofed IP addresses alongside our real IP to mask the origin.
- **Packet Fragmentation (`-f`)**: Split the IP header across several packets to confuse simple Packet Filters.
- **Custom Timing (`-T4` or customized delays)**: Prevent triggering Rate Limiting rules on the target firewalls.

## 2. Shell Execution Demonstration

Here is an example Nmap scan utilizing decoy IPs and packet fragmentation:

```bash
# Executing fragment scan with decoy addresses
nmap -sS -f -D 192.168.1.100,192.168.1.101,ME target-ip.local
```

## 3. Custom Scripting

We can also write a simple Python script using `scapy` to craft and send custom TCP SYN packets with specific flags:

```python
from scapy.all import IP, TCP, send

def send_syn(target_ip, port):
    # Construct IP packet
    ip_packet = IP(dst=target_ip)
    
    # Construct TCP packet with SYN flag (S)
    tcp_packet = TCP(sport=12345, dport=port, flags="S")
    
    # Send packet out
    send(ip_packet / tcp_packet, verbose=False)
    print(f"[+] SYN packet sent to {target_ip}:{port}")

if __name__ == "__main__":
    send_syn("192.168.1.50", 443)
```

## 4. Observations

When we capture the fragmented traffic in Wireshark, the payload is split as follows:

| Fragment Offset | Size (Bytes) | Protocol | Info |
| :--- | :--- | :--- | :--- |
| `0` | `8` | `IPv4` | Fragmented IP Protocol (proto=TCP) |
| `8` | `20` | `TCP` | `443 > 12345 [SYN]` |

> [!NOTE]
> Ensure you have explicit authorization before performing any scanning activities on a network. Keep your labs isolated.
