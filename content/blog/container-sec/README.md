---
title: "Lab 0x09: Kubernetes Sandbox Hardening"
date: "2026-06-10"
tags: ["docker","kubernetes"]
description: "Implementing network policies and AppArmor profiles to container runtimes."
readTime: 3
---

# Lab 0x09: Kubernetes Sandbox Hardening

Docker breakout vectors rely on unconfined capabilities. We configure read-only filesystems and drop privileges.
